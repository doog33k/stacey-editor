package fr.sokaris.stacey.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A FileState.
 */
@Entity
@Table(name = "file_state")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FileState implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "last_modification")
    private ZonedDateTime lastModification;

    @Lob
    @Column(name = "content")
    private String content;

    @ManyToOne
    private File file;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getLastModification() {
        return lastModification;
    }

    public FileState lastModification(ZonedDateTime lastModification) {
        this.lastModification = lastModification;
        return this;
    }

    public void setLastModification(ZonedDateTime lastModification) {
        this.lastModification = lastModification;
    }

    public String getContent() {
        return content;
    }

    public FileState content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public File getFile() {
        return file;
    }

    public FileState file(File file) {
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
        FileState fileState = (FileState) o;
        if (fileState.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, fileState.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "FileState{" +
            "id=" + id +
            ", lastModification='" + lastModification + "'" +
            ", content='" + content + "'" +
            '}';
    }
}
