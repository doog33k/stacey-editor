package fr.sokaris.stacey.service.dto;

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

    private ZonedDateTime lastModification;

    @Lob
    private String content;


    private Long fileId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public ZonedDateTime getLastModification() {
        return lastModification;
    }

    public void setLastModification(ZonedDateTime lastModification) {
        this.lastModification = lastModification;
    }
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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
            ", lastModification='" + lastModification + "'" +
            ", content='" + content + "'" +
            '}';
    }
}
