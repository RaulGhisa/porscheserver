package ro.nullcombustionexception.dao;

import org.springframework.data.repository.CrudRepository;
import ro.nullcombustionexception.entities.DriverSession;

public interface DriverSessionDao extends CrudRepository<DriverSession, Long> {

}
