package fr.sokaris.stacey.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Session.
 */
@Entity
@Table(name = "session")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Session implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "started")
    private ZonedDateTime started;

    @Column(name = "ended")
    private ZonedDateTime ended;

    @ManyToOne
    private File file;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Session name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getStarted() {
        return started;
    }

    public Session started(ZonedDateTime started) {
        this.started = started;
        return this;
    }

    public void setStarted(ZonedDateTime started) {
        this.started = started;
    }

    public ZonedDateTime getEnded() {
        return ended;
    }

    public Session ended(ZonedDateTime ended) {
        this.ended = ended;
        return this;
    }

    public void setEnded(ZonedDateTime ended) {
        this.ended = ended;
    }

    public File getFile() {
        return file;
    }

    public Session file(File file) {
        this.file = file;
        return this;
    }

    public void setFile(File file) {
        this.file = file;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Session session = (Session) o;
        if (session.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, session.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Session{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", started='" + started + "'" +
            ", ended='" + ended + "'" +
            '}';
    }
}
