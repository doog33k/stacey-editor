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

    @Mapping(source = "fileState.id", target = "fileStateId")
    FileDTO fileToFileDTO(File file);

    List<FileDTO> filesToFileDTOs(List<File> files);

    @Mapping(target = "sessions", ignore = true)
    @Mapping(source = "fileStateId", target = "fileState")
    File fileDTOToFile(FileDTO fileDTO);

    List<File> fileDTOsToFiles(List<FileDTO> fileDTOs);

    default FileState fileStateFromId(Long id) {
        if (id == null) {
            return null;
        }
        FileState fileState = new FileState();
        fileState.setId(id);
        return fileState;
    }
}
