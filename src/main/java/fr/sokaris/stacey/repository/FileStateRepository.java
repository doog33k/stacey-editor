package fr.sokaris.stacey.repository;

import fr.sokaris.stacey.domain.FileState;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the FileState entity.
 */
@SuppressWarnings("unused")
public interface FileStateRepository extends JpaRepository<FileState,Long> {

}
