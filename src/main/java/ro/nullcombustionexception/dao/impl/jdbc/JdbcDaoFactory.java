package ro.nullcombustionexception.dao.impl.jdbc;

import ro.nullcombustionexception.dao.DaoFactory;
import ro.nullcombustionexception.dao.MarkerDao;

public class JdbcDaoFactory extends DaoFactory {
    @Override
    public MarkerDao getMarkerDao() {
        return null;
    }

//    @Override
//    public CartDao getCartDao() {
//        return new JdbcCartDao();
//    }
//
//    @Override
//    public ItemsDao getItemsDao() {
//        return new JdbcItemsDao();
//    }
}
