package ro.nullcombustionexception.entities;

import org.hibernate.annotations.GenericGenerator;

import ro.nullcombustionexception.entities.LatitudeLongitude;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "driver_session")
public class DriverSession {

    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "native"
    )
    @GenericGenerator(
            name = "native",
            strategy = "native"
    )
    @Column(name = "driver_session_id")
    private long id;

    @Column(name = "engine_heat_time")
    private Double engineHeatTime;

    @Column(name = "session_distance")
    private Double sessionDistance;

    @Column(name = "session_duration")
    private Double sessionDuration;

    @Column(name = "traffic_jam_present")
    private Integer trafficJamPresent;

    @Column(name = "average_speed")
    private Double averageSpeed;

    @Column(name = "driver_profile")
    private String driverProfile;

    @OneToMany(
            mappedBy = "driverSession",
            fetch = FetchType.EAGER
    )
    private List<LatitudeLongitude> latitudeLongitudeList = new ArrayList<>();

    public double getEngineHeatTime() {
        return engineHeatTime;
    }

    public void setEngineHeatTime(double engineHeatTime) {
        this.engineHeatTime = engineHeatTime;
    }

    public double getSessionDistance() {
        return sessionDistance;
    }

    public void setSessionDistance(double sessionDistance) {
        this.sessionDistance = sessionDistance;
    }

    public double getSessionDuration() {
        return sessionDuration;
    }

    public void setSessionDuration(double sessionDuration) {
        this.sessionDuration = sessionDuration;
    }


    public Integer getTrafficJamPresent() {
        return trafficJamPresent;
    }

    public void setTrafficJamPresent(Integer trafficJamPresent) {
        this.trafficJamPresent = trafficJamPresent;
    }

    public double getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public String getDriverProfile() {
        return driverProfile;
    }

    public void setDriverProfile(String driverProfile) {
        this.driverProfile = driverProfile;
    }

    public List<LatitudeLongitude> getLatitudeLongitudeList() {
        return latitudeLongitudeList;
    }

    public void setLatitudeLongitudeList(List<LatitudeLongitude> latitudeLongitudeList) {
        this.latitudeLongitudeList = latitudeLongitudeList;
    }
}
