package fr.sokaris.stacey.service;

import fr.sokaris.stacey.service.dto.FileStateDTO;
import java.util.List;

/**
 * Service Interface for managing FileState.
 */
public interface FileStateService {

    /**
     * Save a fileState.
     *
     * @param fileStateDTO the entity to save
     * @return the persisted entity
     */
    FileStateDTO save(FileStateDTO fileStateDTO);

    /**
     *  Get all the fileStates.
     *  
     *  @return the list of entities
     */
    List<FileStateDTO> findAll();

    /**
     *  Get the "id" fileState.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    FileStateDTO findOne(Long id);

    /**
     *  Delete the "id" fileState.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
