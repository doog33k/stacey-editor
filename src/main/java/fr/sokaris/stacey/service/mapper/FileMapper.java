package fr.sokaris.stacey.service.mapper;

import fr.sokaris.stacey.domain.*;
import fr.sokaris.stacey.service.dto.FileDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity File and its DTO FileDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FileMapper {

    @Mapping(source = "session.id", target = "sessionId")
    FileDTO fileToFileDTO(File file);

    List<FileDTO> filesToFileDTOs(List<File> files);

    @Mapping(source = "sessionId", target = "session")
    @Mapping(target = "files", ignore = true)
    File fileDTOToFile(FileDTO fileDTO);

    List<File> fileDTOsToFiles(List<FileDTO> fileDTOs);

    default Session sessionFromId(Long id) {
        if (id == null) {
            return null;
        }
        Session session = new Session();
        session.setId(id);
        return session;
    }
}
