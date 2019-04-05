package ro.nullcombustionexception.dao;

import org.springframework.data.repository.CrudRepository;
import ro.nullcombustionexception.entities.Marker;

import java.util.List;

public interface MarkerTestDao extends CrudRepository<Marker, Integer> {

    List<Marker> findAllByHazardType(String hazardType);
}
