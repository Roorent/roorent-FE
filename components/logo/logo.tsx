import { LOGO } from "#/constants/images";

export default function Logo(){
    return(
        <div>
            <img src={LOGO} alt="Logo Roorent" className="w-[260px]"/>
        </div>
    )
}