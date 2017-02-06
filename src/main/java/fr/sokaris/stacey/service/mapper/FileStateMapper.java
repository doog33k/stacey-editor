package fr.sokaris.stacey.service.mapper;

import fr.sokaris.stacey.domain.*;
import fr.sokaris.stacey.service.dto.FileStateDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity FileState and its DTO FileStateDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FileStateMapper {

    @Mapping(source = "file.id", target = "fileId")
    FileStateDTO fileStateToFileStateDTO(FileState fileState);

    List<FileStateDTO> fileStatesToFileStateDTOs(List<FileState> fileStates);

    @Mapping(source = "fileId", target = "file")
    FileState fileStateDTOToFileState(FileStateDTO fileStateDTO);

    List<FileState> fileStateDTOsToFileStates(List<FileStateDTO> fileStateDTOs);

    default File fileFromId(Long id) {
        if (id == null) {
            return null;
        }
        File file = new File();
        file.setId(id);
        return file;
    }
}
