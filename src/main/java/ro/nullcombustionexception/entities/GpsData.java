package ro.nullcombustionexception.entities;

import javax.persistence.*;

@Entity
@Table(name = "gps_data")
public class GpsData {

    @Id
    private long id;

    @Column(name = "x")
    private float x;

    @Column(name = "y")
    private float y;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Marker marker;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public Marker getMarker() {
        return marker;
    }

    public void setMarker(Marker marker) {
        this.marker = marker;
    }
}
