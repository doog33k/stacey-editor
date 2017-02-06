package fr.sokaris.stacey.service.impl;

import fr.sokaris.stacey.service.SessionService;
import fr.sokaris.stacey.domain.Session;
import fr.sokaris.stacey.repository.SessionRepository;
import fr.sokaris.stacey.service.dto.SessionDTO;
import fr.sokaris.stacey.service.mapper.SessionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Session.
 */
@Service
@Transactional
public class SessionServiceImpl implements SessionService{

    private final Logger log = LoggerFactory.getLogger(SessionServiceImpl.class);
    
    @Inject
    private SessionRepository sessionRepository;

    @Inject
    private SessionMapper sessionMapper;

    /**
     * Save a session.
     *
     * @param sessionDTO the entity to save
     * @return the persisted entity
     */
    public SessionDTO save(SessionDTO sessionDTO) {
        log.debug("Request to save Session : {}", sessionDTO);
        Session session = sessionMapper.sessionDTOToSession(sessionDTO);
        session = sessionRepository.save(session);
        SessionDTO result = sessionMapper.sessionToSessionDTO(session);
        return result;
    }

    /**
     *  Get all the sessions.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<SessionDTO> findAll() {
        log.debug("Request to get all Sessions");
        List<SessionDTO> result = sessionRepository.findAll().stream()
            .map(sessionMapper::sessionToSessionDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one session by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public SessionDTO findOne(Long id) {
        log.debug("Request to get Session : {}", id);
        Session session = sessionRepository.findOne(id);
        SessionDTO sessionDTO = sessionMapper.sessionToSessionDTO(session);
        return sessionDTO;
    }

    /**
     *  Delete the  session by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Session : {}", id);
        sessionRepository.delete(id);
    }
}
