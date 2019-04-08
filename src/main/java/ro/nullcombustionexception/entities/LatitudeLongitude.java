package ro.nullcombustionexception.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "lat_long")
public class LatitudeLongitude implements Serializable {

    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "native"
    )
    @GenericGenerator(
            name = "native",
            strategy = "native"
    )
    @Column(name = "long_id")
    private long id;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "latitude")
    private Double latitude;

    @JsonIgnore
    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "driver_session_id")
    private DriverSession driverSession;

    public LatitudeLongitude() {

    }

    public LatitudeLongitude(Double longitude, Double latitude, DriverSession driverSession) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.driverSession = driverSession;
    }

    public static LatitudeLongitude addValue(double longitude, double latitude, DriverSession driverSession) {
        return new LatitudeLongitude(longitude, latitude, driverSession);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public DriverSession getDriverSession() {
        return driverSession;
    }

    public void setDriverSession(DriverSession driverSession) {
        this.driverSession = driverSession;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
}
