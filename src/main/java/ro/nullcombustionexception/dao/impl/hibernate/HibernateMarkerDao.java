package ro.nullcombustionexception.dao.impl.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import ro.nullcombustionexception.dao.MarkerDao;
import ro.nullcombustionexception.dao.impl.hibernate.util.HibernateUtil;
import ro.nullcombustionexception.entities.Marker;

public class HibernateMarkerDao implements MarkerDao {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    @Override
    public Marker find(long id) {
        Session currentSession = sessionFactory.openSession();
        Transaction transaction = currentSession.beginTransaction();
        Marker cart = currentSession.get(Marker.class, id);
        transaction.commit();
        currentSession.close();
        return cart;
    }

    @Override
    public void delete(Marker objectToDelete) {
        Session currentSession = sessionFactory.openSession();
        Transaction transaction = currentSession.beginTransaction();
        currentSession.delete(objectToDelete);
        transaction.commit();
        currentSession.close();
    }

    @Override
    public void update(Marker objectToUpdate) {
        Session currentSession = sessionFactory.openSession();
        Transaction transaction = currentSession.beginTransaction();
        currentSession.update(objectToUpdate);
        transaction.commit();
        currentSession.close();
    }

    @Override
    public void insert(Marker objectToCreate) {
        Session currentSession = sessionFactory.openSession();
        Transaction transaction = currentSession.beginTransaction();
        currentSession.merge(objectToCreate);
        transaction.commit();
        currentSession.close();
    }
}
