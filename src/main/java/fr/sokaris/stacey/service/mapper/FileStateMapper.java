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

    FileStateDTO fileStateToFileStateDTO(FileState fileState);

    List<FileStateDTO> fileStatesToFileStateDTOs(List<FileState> fileStates);

    @Mapping(target = "files", ignore = true)
    FileState fileStateDTOToFileState(FileStateDTO fileStateDTO);

    List<FileState> fileStateDTOsToFileStates(List<FileStateDTO> fileStateDTOs);
}
