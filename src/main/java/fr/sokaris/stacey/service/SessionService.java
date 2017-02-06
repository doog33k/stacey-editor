package fr.sokaris.stacey.service;

import fr.sokaris.stacey.service.dto.SessionDTO;
import java.util.List;

/**
 * Service Interface for managing Session.
 */
public interface SessionService {

    /**
     * Save a session.
     *
     * @param sessionDTO the entity to save
     * @return the persisted entity
     */
    SessionDTO save(SessionDTO sessionDTO);

    /**
     *  Get all the sessions.
     *  
     *  @return the list of entities
     */
    List<SessionDTO> findAll();

    /**
     *  Get the "id" session.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    SessionDTO findOne(Long id);

    /**
     *  Delete the "id" session.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
