package fr.sokaris.stacey.service.mapper;

import fr.sokaris.stacey.domain.*;
import fr.sokaris.stacey.service.dto.SessionDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Session and its DTO SessionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SessionMapper {

    @Mapping(source = "file.id", target = "fileId")
    SessionDTO sessionToSessionDTO(Session session);

    List<SessionDTO> sessionsToSessionDTOs(List<Session> sessions);

    @Mapping(source = "fileId", target = "file")
    Session sessionDTOToSession(SessionDTO sessionDTO);

    List<Session> sessionDTOsToSessions(List<SessionDTO> sessionDTOs);

    default File fileFromId(Long id) {
        if (id == null) {
            return null;
        }
        File file = new File();
        file.setId(id);
        return file;
    }
}
