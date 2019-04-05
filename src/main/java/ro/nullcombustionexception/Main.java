/*************************************************************************
 * ULLINK CONFIDENTIAL INFORMATION
 * _______________________________
 *
 * All Rights Reserved.
 *
 * NOTICE: This file and its content are the property of Ullink. The
 * information included has been classified as Confidential and may
 * not be copied, modified, distributed, or otherwise disseminated, in
 * whole or part, without the express written permission of Ullink.
 ************************************************************************/
package ro.nullcombustionexception;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ro.nullcombustionexception.dao.DaoFactory;
import ro.nullcombustionexception.dao.MarkerDao;
import ro.nullcombustionexception.dao.impl.hibernate.util.HibernateUtil;
import ro.nullcombustionexception.entities.Marker;

import java.io.IOException;

@SpringBootApplication
public class Main {

    /**
     * This is just a small demo.
     * <p>
     * Please also see  ShowCartDetailsTest. (Note ShowCartDetailsTest is not seen in the src folder)
     */
    public static void main(String[] args) throws IOException {
        DaoFactory daoFactory = DaoFactory.getInstance(DaoFactory.Type.HIBERNATE);

        MarkerDao markerDao = daoFactory.getMarkerDao();

        Marker marker = new Marker();
        marker.setHazardType("pothole");
        markerDao.insert(marker);

        SpringApplication.run(Main.class, args);
        // wait for key pressed
        System.in.read();
        HibernateUtil.getSessionFactory().close();
    }
}
