public abstract class Equipment {
    private int ID;
    private String placement;
    private boolean replaceable;

    public Equipment(int ID, String placement, boolean replaceable) {
        this.ID = ID;
        this.placement = placement;
        this.replaceable = replaceable;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getPlacement() {
        return placement;
    }

    public void setPlacement(String placement) {
        this.placement = placement;
    }

    public boolean isReplaceable() {
        return replaceable;
    }

    public void setReplaceable(boolean replaceable) {
        this.replaceable = replaceable;
    }

    @Override
    public String toString() {
        return String.format("Equipment: %s\nID: %d\nPlacement: %s\nReplaceable: %b", className(), getID(), getPlacement(), isReplaceable());
    }

    public String className() {
        return this.getClass().getName();
    }

    public String toStringForFile() {
        return String.format("%s\n%s\n%s\n%s ", className(),getID(), getPlacement(), isReplaceable());
    }
}
