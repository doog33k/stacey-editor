package fr.sokaris.stacey.service.impl;

import fr.sokaris.stacey.service.FileStateService;
import fr.sokaris.stacey.domain.FileState;
import fr.sokaris.stacey.repository.FileStateRepository;
import fr.sokaris.stacey.service.dto.FileStateDTO;
import fr.sokaris.stacey.service.mapper.FileStateMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing FileState.
 */
@Service
@Transactional
public class FileStateServiceImpl implements FileStateService{

    private final Logger log = LoggerFactory.getLogger(FileStateServiceImpl.class);
    
    @Inject
    private FileStateRepository fileStateRepository;

    @Inject
    private FileStateMapper fileStateMapper;

    /**
     * Save a fileState.
     *
     * @param fileStateDTO the entity to save
     * @return the persisted entity
     */
    public FileStateDTO save(FileStateDTO fileStateDTO) {
        log.debug("Request to save FileState : {}", fileStateDTO);
        FileState fileState = fileStateMapper.fileStateDTOToFileState(fileStateDTO);
        fileState = fileStateRepository.save(fileState);
        FileStateDTO result = fileStateMapper.fileStateToFileStateDTO(fileState);
        return result;
    }

    /**
     *  Get all the fileStates.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<FileStateDTO> findAll() {
        log.debug("Request to get all FileStates");
        List<FileStateDTO> result = fileStateRepository.findAll().stream()
            .map(fileStateMapper::fileStateToFileStateDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one fileState by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public FileStateDTO findOne(Long id) {
        log.debug("Request to get FileState : {}", id);
        FileState fileState = fileStateRepository.findOne(id);
        FileStateDTO fileStateDTO = fileStateMapper.fileStateToFileStateDTO(fileState);
        return fileStateDTO;
    }

    /**
     *  Delete the  fileState by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FileState : {}", id);
        fileStateRepository.delete(id);
    }
}
