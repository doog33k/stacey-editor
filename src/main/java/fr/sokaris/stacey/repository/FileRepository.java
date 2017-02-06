package fr.sokaris.stacey.repository;

import fr.sokaris.stacey.domain.File;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the File entity.
 */
@SuppressWarnings("unused")
public interface FileRepository extends JpaRepository<File,Long> {

}
