type Props = {

    open: boolean;
};

const MatchmakingModal = ({
    open
}: Props) => {

    if (!open) {
        return null;
    }

    return (

        <div className="
            fixed
            inset-0
            bg-black/80
            flex
            items-center
            justify-center
            z-50
        ">

            <div className="
                bg-zinc-900
                p-10
                rounded-3xl
                text-center
            ">

                <div className="
                    w-20
                    h-20
                    border-8
                    border-green-500/20
                    border-t-green-500
                    rounded-full
                    animate-spin
                    mx-auto
                    mb-8
                " />

                <h2 className="
                    text-3xl
                    font-bold
                ">

                    Matching...

                </h2>

                <p className="
                    mt-4
                    text-zinc-400
                ">

                    Finding partner

                </p>

            </div>

        </div>
    );
};

export default MatchmakingModal;