package fr.sokaris.stacey.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
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

    @OneToMany(mappedBy = "session")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<File> files = new HashSet<>();

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

    public Set<File> getFiles() {
        return files;
    }

    public Session files(Set<File> files) {
        this.files = files;
        return this;
    }

    public Session addFile(File file) {
        files.add(file);
        file.setSession(this);
        return this;
    }

    public Session removeFile(File file) {
        files.remove(file);
        file.setSession(null);
        return this;
    }

    public void setFiles(Set<File> files) {
        this.files = files;
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
