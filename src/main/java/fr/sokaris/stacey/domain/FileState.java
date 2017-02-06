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

    @Column(name = "version")
    private Long version;

    @Column(name = "last")
    private ZonedDateTime last;

    @Lob
    @Column(name = "content")
    private byte[] content;

    @Column(name = "content_content_type")
    private String contentContentType;

    @OneToMany(mappedBy = "fileState")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<File> files = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVersion() {
        return version;
    }

    public FileState version(Long version) {
        this.version = version;
        return this;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public ZonedDateTime getLast() {
        return last;
    }

    public FileState last(ZonedDateTime last) {
        this.last = last;
        return this;
    }

    public void setLast(ZonedDateTime last) {
        this.last = last;
    }

    public byte[] getContent() {
        return content;
    }

    public FileState content(byte[] content) {
        this.content = content;
        return this;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getContentContentType() {
        return contentContentType;
    }

    public FileState contentContentType(String contentContentType) {
        this.contentContentType = contentContentType;
        return this;
    }

    public void setContentContentType(String contentContentType) {
        this.contentContentType = contentContentType;
    }

    public Set<File> getFiles() {
        return files;
    }

    public FileState files(Set<File> files) {
        this.files = files;
        return this;
    }

    public FileState addFile(File file) {
        files.add(file);
        file.setFileState(this);
        return this;
    }

    public FileState removeFile(File file) {
        files.remove(file);
        file.setFileState(null);
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
            ", version='" + version + "'" +
            ", last='" + last + "'" +
            ", content='" + content + "'" +
            ", contentContentType='" + contentContentType + "'" +
            '}';
    }
}
