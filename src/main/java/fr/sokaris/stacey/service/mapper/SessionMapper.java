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

    SessionDTO sessionToSessionDTO(Session session);

    List<SessionDTO> sessionsToSessionDTOs(List<Session> sessions);

    @Mapping(target = "files", ignore = true)
    Session sessionDTOToSession(SessionDTO sessionDTO);

    List<Session> sessionDTOsToSessions(List<SessionDTO> sessionDTOs);
}
