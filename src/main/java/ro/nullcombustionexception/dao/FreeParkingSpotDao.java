package ro.nullcombustionexception.dao;

import org.springframework.data.repository.CrudRepository;
import ro.nullcombustionexception.entities.FreeParkingSpot;

public interface FreeParkingSpotDao extends CrudRepository<FreeParkingSpot, Long> {

}
