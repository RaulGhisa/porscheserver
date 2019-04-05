package ro.nullcombustionexception.dao;

import ro.nullcombustionexception.entities.Marker;

public interface MarkerDao extends Dao<Marker> {

    @Override
    Marker find(long id);

    @Override
    void delete(Marker objectToDelete);

    @Override
    void update(Marker objectToUpdate);

    @Override
    void insert(Marker objectToCreate);
}
