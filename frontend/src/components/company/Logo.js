import {AdvancedImage} from '@cloudinary/react'
import {Cloudinary} from '@cloudinary/url-gen'

// Import required actions.
import {thumbnail} from "@cloudinary/url-gen/actions/resize";

// Import required qualifiers.
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

const Logo = ({logo}) => {

    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'pluto-hppy'
        }
    }); 

    const myImage = logo ? cld.image(logo.public_id).resize(thumbnail().width(300).height(300).gravity(focusOn(FocusOn.face()))) : "";

    return <>
        {myImage ? <AdvancedImage cldImg={myImage} style={{width: "300px"}} /> : ""}
    </>
}

export default Logo
