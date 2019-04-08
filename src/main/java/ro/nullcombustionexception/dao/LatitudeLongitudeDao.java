package ro.nullcombustionexception.dao;

import org.springframework.data.repository.CrudRepository;
import ro.nullcombustionexception.entities.DriverSession;
import ro.nullcombustionexception.entities.LatitudeLongitude;

import java.util.List;
import java.util.Map;

public interface LatitudeLongitudeDao extends CrudRepository<LatitudeLongitude, Integer> {

    List<LatitudeLongitude> findAllByDriverSessionId(long id);

}
