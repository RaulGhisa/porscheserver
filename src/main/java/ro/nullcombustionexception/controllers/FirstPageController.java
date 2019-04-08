package ro.nullcombustionexception.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.nullcombustionexception.dao.FreeParkingSpotDao;
import ro.nullcombustionexception.dao.LatitudeLongitudeDao;
import ro.nullcombustionexception.dao.MarkerTestDao;
import ro.nullcombustionexception.dao.DriverSessionDao;

import ro.nullcombustionexception.dao.impl.hibernate.util.HibernateUtil;
import ro.nullcombustionexception.entities.FreeParkingSpot;
import ro.nullcombustionexception.entities.LatitudeLongitude;
import ro.nullcombustionexception.entities.Marker;
import ro.nullcombustionexception.entities.DriverSession;
import ro.nullcombustionexception.model.DriverSessionJson;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class FirstPageController {

    @Autowired
    private MarkerTestDao markerTestDao;

    @Autowired
    private DriverSessionDao driverSessionDao;

    @Autowired
    private LatitudeLongitudeDao latitudeDao;

    @Autowired
    private FreeParkingSpotDao freeParkingSpotDao;

    @GetMapping(path = "/load")
    public Object getObj() {
        return "Acesta este bn";
    }

    @GetMapping(path = "/hazards")
    public List<Marker> getHazards() {
        return markerTestDao.findAllByHazardType("pothole");
    }

    @GetMapping(path = "/driversession/{id}")
    public DriverSession getDriverSession(@PathVariable Long id) {
        return driverSessionDao.findById(id).get();
    }

    @GetMapping(path = "/sessionlatlong/{id}")
    public List<LatitudeLongitude> latitudeLongitudeList(@PathVariable Long id) {
        return latitudeDao.findAllByDriverSessionId(id);
    }

    @PostMapping(path = "/submit-session")
    public String submitSession(
            @RequestBody DriverSessionJson driverSessionJson
    ) {
        System.out.println(driverSessionJson.toString());

        DriverSession driverSession = new DriverSession();
        driverSession.setAverageSpeed(driverSessionJson.getAverageSpeed());
        driverSession.setDriverProfile(driverSessionJson.getDriverProfile());
        driverSession.setEngineHeatTime(driverSessionJson.getEngineHeatTime());
        driverSession.setSessionDistance(driverSessionJson.getSessionDistance());
        driverSession.setSessionDuration(driverSessionJson.getSessionDuration());

        driverSessionDao.save(driverSession);

        /*DriverSession session = driverSessionDao.findById(1).get();
        System.out.println(session.getAverageSpeed());*/

        List<LatitudeLongitude> latitudeLongitudes = new ArrayList<>();

        for (int i = 0; i < driverSessionJson.getLatitudeList().size(); i++) {
            latitudeLongitudes.add(LatitudeLongitude.addValue(driverSessionJson.getLongitudeList().get(i),
                    driverSessionJson.getLatitudeList().get(i), driverSession));
        }
//        driverSessionJson.getLongitudeList().forEach(x -> longitudes.add(Longitude.addValue(x, driverSession)));
//        driverSessionJson.getLatitudeList().forEach(x -> latitudes.add(Latitude.addValue(x, driverSession)));
//
        for (LatitudeLongitude latitudeLongitude : latitudeLongitudes) {
            System.out.println("lat: " + latitudeLongitude.getLatitude());
            System.out.println("long: " + latitudeLongitude.getLongitude());
            System.out.println("dsess: " + latitudeLongitude.getDriverSession());
            latitudeDao.save(latitudeLongitude);
        }

        return driverSessionJson.toString();
    }

    @PostMapping(path = "/submit-free-spots")
    public String submitFreeSpots(
            @RequestBody FreeParkingSpot freeParkingSpot
    ){
        freeParkingSpotDao.save(freeParkingSpot);

        System.out.print(freeParkingSpot.getLatitude());
        System.out.println(" " + freeParkingSpot.getLatitude());
        return null;
    }

    @GetMapping(path = "/free-spots")
    public List<FreeParkingSpot> getFreeSpots() {
        try
        {
            return HibernateUtil.getSessionFactory().openSession().createCriteria(FreeParkingSpot.class).list();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
