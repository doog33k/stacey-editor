package fr.sokaris.stacey.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A DTO for the File entity.
 */
public class FileDTO implements Serializable {

    private Long id;

    private String name;


    private Long fileStateId;
    
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

    public Long getFileStateId() {
        return fileStateId;
    }

    public void setFileStateId(Long fileStateId) {
        this.fileStateId = fileStateId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FileDTO fileDTO = (FileDTO) o;

        if ( ! Objects.equals(id, fileDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "FileDTO{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
