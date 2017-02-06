package fr.sokaris.stacey.service.dto;

import org.hibernate.annotations.Type;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;


/**
 * A DTO for the FileState entity.
 */
public class FileStateDTO implements Serializable {

    private Long id;

    private Long version;

    private ZonedDateTime last;

    @Lob
    private byte[] content;

    private String contentContentType;

    private Long fileId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
    public ZonedDateTime getLast() {
        return last;
    }

    public void setLast(ZonedDateTime last) {
        this.last = last;
    }
    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public void setContent(String content) {
        this.content = content.getBytes();
    }
    public String getContentContentType() {
        return contentContentType;
    }

    public void setContentContentType(String contentContentType) {
        this.contentContentType = contentContentType;
    }

    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FileStateDTO fileStateDTO = (FileStateDTO) o;

        if ( ! Objects.equals(id, fileStateDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "FileStateDTO{" +
            "id=" + id +
            ", version='" + version + "'" +
            ", last='" + last + "'" +
            ", content='" + content + "'" +
            '}';
    }
}
