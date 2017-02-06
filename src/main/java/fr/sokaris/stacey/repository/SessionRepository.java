package fr.sokaris.stacey.repository;

import fr.sokaris.stacey.domain.Session;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Session entity.
 */
@SuppressWarnings("unused")
public interface SessionRepository extends JpaRepository<Session,Long> {

}
