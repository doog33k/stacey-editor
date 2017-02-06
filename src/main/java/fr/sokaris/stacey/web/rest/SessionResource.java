package fr.sokaris.stacey.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.sokaris.stacey.service.SessionService;
import fr.sokaris.stacey.web.rest.util.HeaderUtil;
import fr.sokaris.stacey.service.dto.SessionDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing Session.
 */
@RestController
@RequestMapping("/api")
public class SessionResource {

    private final Logger log = LoggerFactory.getLogger(SessionResource.class);
        
    @Inject
    private SessionService sessionService;

    /**
     * POST  /sessions : Create a new session.
     *
     * @param sessionDTO the sessionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sessionDTO, or with status 400 (Bad Request) if the session has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sessions")
    @Timed
    public ResponseEntity<SessionDTO> createSession(@RequestBody SessionDTO sessionDTO) throws URISyntaxException {
        log.debug("REST request to save Session : {}", sessionDTO);
        if (sessionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("session", "idexists", "A new session cannot already have an ID")).body(null);
        }
        SessionDTO result = sessionService.save(sessionDTO);
        return ResponseEntity.created(new URI("/api/sessions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("session", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sessions : Updates an existing session.
     *
     * @param sessionDTO the sessionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sessionDTO,
     * or with status 400 (Bad Request) if the sessionDTO is not valid,
     * or with status 500 (Internal Server Error) if the sessionDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sessions")
    @Timed
    public ResponseEntity<SessionDTO> updateSession(@RequestBody SessionDTO sessionDTO) throws URISyntaxException {
        log.debug("REST request to update Session : {}", sessionDTO);
        if (sessionDTO.getId() == null) {
            return createSession(sessionDTO);
        }
        SessionDTO result = sessionService.save(sessionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("session", sessionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sessions : get all the sessions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sessions in body
     */
    @GetMapping("/sessions")
    @Timed
    public List<SessionDTO> getAllSessions() {
        log.debug("REST request to get all Sessions");
        return sessionService.findAll();
    }

    /**
     * GET  /sessions/:id : get the "id" session.
     *
     * @param id the id of the sessionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sessionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sessions/{id}")
    @Timed
    public ResponseEntity<SessionDTO> getSession(@PathVariable Long id) {
        log.debug("REST request to get Session : {}", id);
        SessionDTO sessionDTO = sessionService.findOne(id);
        return Optional.ofNullable(sessionDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /sessions/:id : delete the "id" session.
     *
     * @param id the id of the sessionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sessions/{id}")
    @Timed
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        log.debug("REST request to delete Session : {}", id);
        sessionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("session", id.toString())).build();
    }

}
