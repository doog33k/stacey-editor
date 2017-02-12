package fr.sokaris.stacey.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.sokaris.stacey.service.FileStateService;
import fr.sokaris.stacey.web.rest.util.HeaderUtil;
import fr.sokaris.stacey.web.rest.util.PaginationUtil;
import fr.sokaris.stacey.service.dto.FileStateDTO;

import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing FileState.
 */
@RestController
@RequestMapping("/api")
public class FileStateResource {

    private final Logger log = LoggerFactory.getLogger(FileStateResource.class);
        
    @Inject
    private FileStateService fileStateService;

    /**
     * POST  /file-states : Create a new fileState.
     *
     * @param fileStateDTO the fileStateDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fileStateDTO, or with status 400 (Bad Request) if the fileState has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/file-states")
    @Timed
    public ResponseEntity<FileStateDTO> createFileState(@RequestBody FileStateDTO fileStateDTO) throws URISyntaxException {
        log.debug("REST request to save FileState : {}", fileStateDTO);
        if (fileStateDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("fileState", "idexists", "A new fileState cannot already have an ID")).body(null);
        }
        FileStateDTO result = fileStateService.save(fileStateDTO);
        return ResponseEntity.created(new URI("/api/file-states/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("fileState", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /file-states : Updates an existing fileState.
     *
     * @param fileStateDTO the fileStateDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fileStateDTO,
     * or with status 400 (Bad Request) if the fileStateDTO is not valid,
     * or with status 500 (Internal Server Error) if the fileStateDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/file-states")
    @Timed
    public ResponseEntity<FileStateDTO> updateFileState(@RequestBody FileStateDTO fileStateDTO) throws URISyntaxException {
        log.debug("REST request to update FileState : {}", fileStateDTO);
        if (fileStateDTO.getId() == null) {
            return createFileState(fileStateDTO);
        }
        FileStateDTO result = fileStateService.save(fileStateDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("fileState", fileStateDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /file-states : get all the fileStates.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of fileStates in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/file-states")
    @Timed
    public ResponseEntity<List<FileStateDTO>> getAllFileStates(@ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of FileStates");
        Page<FileStateDTO> page = fileStateService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/file-states");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /file-states/:id : get the "id" fileState.
     *
     * @param id the id of the fileStateDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fileStateDTO, or with status 404 (Not Found)
     */
    @GetMapping("/file-states/{id}")
    @Timed
    public ResponseEntity<FileStateDTO> getFileState(@PathVariable Long id) {
        log.debug("REST request to get FileState : {}", id);
        FileStateDTO fileStateDTO = fileStateService.findOne(id);
        return Optional.ofNullable(fileStateDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /file-states/:id : delete the "id" fileState.
     *
     * @param id the id of the fileStateDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/file-states/{id}")
    @Timed
    public ResponseEntity<Void> deleteFileState(@PathVariable Long id) {
        log.debug("REST request to delete FileState : {}", id);
        fileStateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("fileState", id.toString())).build();
    }

}
