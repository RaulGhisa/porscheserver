package ro.nullcombustionexception.model;


import java.util.List;


public class DriverSessionJson {

    private Double engineHeatTime;

    private Double sessionDistance;

    private Double sessionDuration;

    private Boolean trafficJamPresent;

    private Double averageSpeed;

    private String driverProfile;

    private List<Double> longitudeList;

    private List<Double> latitudeList;

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

    public boolean isTrafficJamPresent() {
        return trafficJamPresent;
    }

    public void setTrafficJamPresent(boolean trafficJamPresent) {
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

    public void setEngineHeatTime(Double engineHeatTime) {
        this.engineHeatTime = engineHeatTime;
    }

    public void setSessionDistance(Double sessionDistance) {
        this.sessionDistance = sessionDistance;
    }

    public void setSessionDuration(Double sessionDuration) {
        this.sessionDuration = sessionDuration;
    }

    public Boolean getTrafficJamPresent() {
        return trafficJamPresent;
    }

    public void setTrafficJamPresent(Boolean trafficJamPresent) {
        this.trafficJamPresent = trafficJamPresent;
    }

    public void setAverageSpeed(Double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public List<Double> getLongitudeList() {
        return longitudeList;
    }

    public void setLongitudeList(List<Double> longitudeList) {
        this.longitudeList = longitudeList;
    }

    public List<Double> getLatitudeList() {
        return latitudeList;
    }

    public void setLatitudeList(List<Double> latitudeList) {
        this.latitudeList = latitudeList;
    }
}
