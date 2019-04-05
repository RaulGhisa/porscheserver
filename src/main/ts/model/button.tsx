namespace ro.demo {

    export interface ButtonProps {
        label: string;
        onClick?: () => void;
    }

    export class Button extends React.Component<ButtonProps> {

        public constructor(props: ButtonProps) {
            super(props);
        }

        private onClick() {
            if (this.props.onClick != null) {
                this.props.onClick();
            }
        }

        render() {
            return (
                <div style={{
                    borderRadius: "5px", display: "inline-block",
                    border: "1px solid " + mainColor, padding: "5px", fontSize: "15px",
                    cursor: "pointer",
                    backgroundColor: mainColor, color: "#f0fac4"
                }}
                onClick={() => {this.onClick()}}> {this.props.label} </div>
            )
        }
    }

}