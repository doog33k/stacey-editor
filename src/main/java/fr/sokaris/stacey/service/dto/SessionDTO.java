package fr.sokaris.stacey.service.dto;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A DTO for the Session entity.
 */
public class SessionDTO implements Serializable {

    private Long id;

    private String name;

    private ZonedDateTime started;

    private ZonedDateTime ended;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public ZonedDateTime getStarted() {
        return started;
    }

    public void setStarted(ZonedDateTime started) {
        this.started = started;
    }
    public ZonedDateTime getEnded() {
        return ended;
    }

    public void setEnded(ZonedDateTime ended) {
        this.ended = ended;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SessionDTO sessionDTO = (SessionDTO) o;

        if ( ! Objects.equals(id, sessionDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SessionDTO{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", started='" + started + "'" +
            ", ended='" + ended + "'" +
            '}';
    }
}
