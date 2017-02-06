package fr.sokaris.stacey.service.impl;

import fr.sokaris.stacey.service.FileService;
import fr.sokaris.stacey.domain.File;
import fr.sokaris.stacey.repository.FileRepository;
import fr.sokaris.stacey.service.dto.FileDTO;
import fr.sokaris.stacey.service.mapper.FileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing File.
 */
@Service
@Transactional
public class FileServiceImpl implements FileService{

    private final Logger log = LoggerFactory.getLogger(FileServiceImpl.class);
    
    @Inject
    private FileRepository fileRepository;

    @Inject
    private FileMapper fileMapper;

    /**
     * Save a file.
     *
     * @param fileDTO the entity to save
     * @return the persisted entity
     */
    public FileDTO save(FileDTO fileDTO) {
        log.debug("Request to save File : {}", fileDTO);
        File file = fileMapper.fileDTOToFile(fileDTO);
        file = fileRepository.save(file);
        FileDTO result = fileMapper.fileToFileDTO(file);
        return result;
    }

    /**
     *  Get all the files.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<FileDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Files");
        Page<File> result = fileRepository.findAll(pageable);
        return result.map(file -> fileMapper.fileToFileDTO(file));
    }

    /**
     *  Get one file by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public FileDTO findOne(Long id) {
        log.debug("Request to get File : {}", id);
        File file = fileRepository.findOne(id);
        FileDTO fileDTO = fileMapper.fileToFileDTO(file);
        return fileDTO;
    }

    /**
     *  Delete the  file by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete File : {}", id);
        fileRepository.delete(id);
    }
}
