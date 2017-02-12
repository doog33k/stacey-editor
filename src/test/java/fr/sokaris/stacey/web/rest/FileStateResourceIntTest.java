package fr.sokaris.stacey.web.rest;

import fr.sokaris.stacey.StaceyEditorApp;

import fr.sokaris.stacey.domain.FileState;
import fr.sokaris.stacey.repository.FileStateRepository;
import fr.sokaris.stacey.service.FileStateService;
import fr.sokaris.stacey.service.dto.FileStateDTO;
import fr.sokaris.stacey.service.mapper.FileStateMapper;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static fr.sokaris.stacey.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FileStateResource REST controller.
 *
 * @see FileStateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StaceyEditorApp.class)
public class FileStateResourceIntTest {

    private static final ZonedDateTime DEFAULT_LAST_MODIFICATION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_MODIFICATION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Inject
    private FileStateRepository fileStateRepository;

    @Inject
    private FileStateMapper fileStateMapper;

    @Inject
    private FileStateService fileStateService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restFileStateMockMvc;

    private FileState fileState;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        FileStateResource fileStateResource = new FileStateResource();
        ReflectionTestUtils.setField(fileStateResource, "fileStateService", fileStateService);
        this.restFileStateMockMvc = MockMvcBuilders.standaloneSetup(fileStateResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FileState createEntity(EntityManager em) {
        FileState fileState = new FileState()
                .lastModification(DEFAULT_LAST_MODIFICATION)
                .content(DEFAULT_CONTENT);
        return fileState;
    }

    @Before
    public void initTest() {
        fileState = createEntity(em);
    }

    @Test
    @Transactional
    public void createFileState() throws Exception {
        int databaseSizeBeforeCreate = fileStateRepository.findAll().size();

        // Create the FileState
        FileStateDTO fileStateDTO = fileStateMapper.fileStateToFileStateDTO(fileState);

        restFileStateMockMvc.perform(post("/api/file-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileStateDTO)))
            .andExpect(status().isCreated());

        // Validate the FileState in the database
        List<FileState> fileStateList = fileStateRepository.findAll();
        assertThat(fileStateList).hasSize(databaseSizeBeforeCreate + 1);
        FileState testFileState = fileStateList.get(fileStateList.size() - 1);
        assertThat(testFileState.getLastModification()).isEqualTo(DEFAULT_LAST_MODIFICATION);
        assertThat(testFileState.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createFileStateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fileStateRepository.findAll().size();

        // Create the FileState with an existing ID
        FileState existingFileState = new FileState();
        existingFileState.setId(1L);
        FileStateDTO existingFileStateDTO = fileStateMapper.fileStateToFileStateDTO(existingFileState);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFileStateMockMvc.perform(post("/api/file-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingFileStateDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<FileState> fileStateList = fileStateRepository.findAll();
        assertThat(fileStateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFileStates() throws Exception {
        // Initialize the database
        fileStateRepository.saveAndFlush(fileState);

        // Get all the fileStateList
        restFileStateMockMvc.perform(get("/api/file-states?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fileState.getId().intValue())))
            .andExpect(jsonPath("$.[*].lastModification").value(hasItem(sameInstant(DEFAULT_LAST_MODIFICATION))))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getFileState() throws Exception {
        // Initialize the database
        fileStateRepository.saveAndFlush(fileState);

        // Get the fileState
        restFileStateMockMvc.perform(get("/api/file-states/{id}", fileState.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fileState.getId().intValue()))
            .andExpect(jsonPath("$.lastModification").value(sameInstant(DEFAULT_LAST_MODIFICATION)))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFileState() throws Exception {
        // Get the fileState
        restFileStateMockMvc.perform(get("/api/file-states/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFileState() throws Exception {
        // Initialize the database
        fileStateRepository.saveAndFlush(fileState);
        int databaseSizeBeforeUpdate = fileStateRepository.findAll().size();

        // Update the fileState
        FileState updatedFileState = fileStateRepository.findOne(fileState.getId());
        updatedFileState
                .lastModification(UPDATED_LAST_MODIFICATION)
                .content(UPDATED_CONTENT);
        FileStateDTO fileStateDTO = fileStateMapper.fileStateToFileStateDTO(updatedFileState);

        restFileStateMockMvc.perform(put("/api/file-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileStateDTO)))
            .andExpect(status().isOk());

        // Validate the FileState in the database
        List<FileState> fileStateList = fileStateRepository.findAll();
        assertThat(fileStateList).hasSize(databaseSizeBeforeUpdate);
        FileState testFileState = fileStateList.get(fileStateList.size() - 1);
        assertThat(testFileState.getLastModification()).isEqualTo(UPDATED_LAST_MODIFICATION);
        assertThat(testFileState.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingFileState() throws Exception {
        int databaseSizeBeforeUpdate = fileStateRepository.findAll().size();

        // Create the FileState
        FileStateDTO fileStateDTO = fileStateMapper.fileStateToFileStateDTO(fileState);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFileStateMockMvc.perform(put("/api/file-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileStateDTO)))
            .andExpect(status().isCreated());

        // Validate the FileState in the database
        List<FileState> fileStateList = fileStateRepository.findAll();
        assertThat(fileStateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFileState() throws Exception {
        // Initialize the database
        fileStateRepository.saveAndFlush(fileState);
        int databaseSizeBeforeDelete = fileStateRepository.findAll().size();

        // Get the fileState
        restFileStateMockMvc.perform(delete("/api/file-states/{id}", fileState.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FileState> fileStateList = fileStateRepository.findAll();
        assertThat(fileStateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
