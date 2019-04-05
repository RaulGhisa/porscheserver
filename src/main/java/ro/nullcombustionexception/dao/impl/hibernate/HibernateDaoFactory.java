package ro.nullcombustionexception.dao.impl.hibernate;

import ro.nullcombustionexception.dao.DaoFactory;
import ro.nullcombustionexception.dao.MarkerDao;

public class HibernateDaoFactory extends DaoFactory {
    @Override
    public MarkerDao getMarkerDao() {
        return new HibernateMarkerDao();
    }
}
