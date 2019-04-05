package ro.nullcombustionexception.dao;

import ro.nullcombustionexception.dao.impl.jdbc.JdbcDaoFactory;
import ro.nullcombustionexception.dao.impl.hibernate.HibernateDaoFactory;

public abstract class DaoFactory {

    private static final DaoFactory HIBERNATE_DAO_FACTORY = new HibernateDaoFactory();
    private static final DaoFactory JDBC_DAO_FACTORY      = new JdbcDaoFactory();

    public enum Type {
        HIBERNATE,
        JDBC
    }

    protected DaoFactory() {

    }

    public static DaoFactory getInstance(Type factoryType) {
        switch (factoryType) {
            case HIBERNATE:
                return HIBERNATE_DAO_FACTORY;
            case JDBC:
                return JDBC_DAO_FACTORY;
            default:
                throw new IllegalArgumentException("Invalid factory");
        }
    }

    public abstract MarkerDao getMarkerDao();
//
//    public abstract ItemsDao getItemsDao();
}
