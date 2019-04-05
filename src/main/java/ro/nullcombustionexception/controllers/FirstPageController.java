package ro.nullcombustionexception.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ro.nullcombustionexception.dao.MarkerTestDao;
import ro.nullcombustionexception.entities.Marker;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.sun.xml.internal.ws.spi.db.BindingContextFactory.LOGGER;

@RestController
@CrossOrigin
public class FirstPageController {

    @Autowired
    private MarkerTestDao markerTestDao;

    @GetMapping(path = "/load")
    public Object getObj() {
        return "Acesta este bn";
    }

    @GetMapping(path = "/hazards")
    public List<Marker> getHazards() {
        return markerTestDao.findAllByHazardType("pothole");
    }
}
