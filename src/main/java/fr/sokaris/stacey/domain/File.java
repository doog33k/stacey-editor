package fr.sokaris.stacey.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A File.
 */
@Entity
@Table(name = "file")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class File implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private Session file;

    @OneToMany(mappedBy = "file")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FileState> fileStates = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public File name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Session getFile() {
        return file;
    }

    public File file(Session session) {
        this.file = session;
        return this;
    }

    public void setFile(Session session) {
        this.file = session;
    }

    public Set<FileState> getFileStates() {
        return fileStates;
    }

    public File fileStates(Set<FileState> fileStates) {
        this.fileStates = fileStates;
        return this;
    }

    public File addFileState(FileState fileState) {
        fileStates.add(fileState);
        fileState.setFile(this);
        return this;
    }

    public File removeFileState(FileState fileState) {
        fileStates.remove(fileState);
        fileState.setFile(null);
        return this;
    }

    public void setFileStates(Set<FileState> fileStates) {
        this.fileStates = fileStates;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        File file = (File) o;
        if (file.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, file.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "File{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
