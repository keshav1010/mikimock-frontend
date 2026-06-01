import {
    createOrder,
    verifyPayment
} from "../services/paymentService";

import {
    useState
} from "react";

declare global {

    interface Window {

        Razorpay: any;
    }
}

const PremiumPage = () => {

    const [loadingPlan, setLoadingPlan] =
        useState<number | null>(null);

    const plans = [

        {
            id: 1,
            monthPlan: 1,
            amount: 3499,
            tag: "Starter",
            highlight: false
        },

        {
            id: 2,
            monthPlan: 3,
            amount: 6499,
            tag: "Popular",
            highlight: false
        },

        {
            id: 3,
            monthPlan: 4,
            amount: 7499,
            tag: "Career Booster",
            highlight: false
        },

        {
            id: 4,
            monthPlan: 6,
            amount: 8999,
            tag: "BEST VALUE",
            highlight: true
        }
    ];

    const handlePayment = async (
        amount: number,
        monthPlan: number
    ) => {

        try {

            setLoadingPlan(monthPlan);

            console.log(
                "Creating order..."
            );

            const response =
                await createOrder(
                    amount,
                    monthPlan
                );

            console.log(
                "Order Created:",
                response
            );

            const data =
                response.data;

            const options = {

                key:
                    data.razorpayKey,

                amount:
                    data.amount,

                currency:
                    data.currency,

                order_id:
                    data.razorpayOrderId,

                name:
                    "MikiMock",

                description:
                    `${monthPlan} Months Premium Plan`,

                image:
                    "/logo.png",

                theme: {
                    color: "#ffffff"
                },

                handler: async function (
                    razorpayResponse: any
                ) {

                    try {

                        console.log(
                            "Payment Success:",
                            razorpayResponse
                        );

                        await verifyPayment({

                            paymentId:
                                data.paymentId,

                            orderId:
                                razorpayResponse.razorpay_order_id,

                            transactionId:
                                razorpayResponse.razorpay_payment_id,

                            paymentReference:
                                "Razorpay",

                            signature:
                                razorpayResponse.razorpay_signature
                        });

                        alert(
                            "Premium Activated Successfully 🚀"
                        );

                    } catch (error) {

                        console.error(
                            "Verification Failed",
                            error
                        );

                        alert(
                            "Payment verification failed"
                        );
                    }
                },

                modal: {

                    ondismiss: function () {

                        console.log(
                            "Payment popup closed"
                        );
                    }
                },

                prefill: {

                    email: "",

                    contact: ""
                }
            };

            const razorpay =
                new window.Razorpay(
                    options
                );

            razorpay.open();

        } catch (error) {

            console.error(error);

            alert(
                "Payment Failed"
            );

        } finally {

            setLoadingPlan(null);
        }
    };

    return (

        <div className="
            min-h-screen
            bg-black
            text-white
            pt-28
            px-4
            md:px-8
            overflow-hidden
        ">

            {/* HERO SECTION */}

            <div className="
                max-w-7xl
                mx-auto
            ">

                <div className="
                    text-center
                    mb-16
                ">

                    <div className="
                        inline-flex
                        items-center
                        gap-2
                        px-5
                        py-2
                        rounded-full
                        bg-white/10
                        border
                        border-white/10
                        text-sm
                        text-zinc-300
                        mb-6
                    ">

                        🚀 Trusted by 10,000+
                        Premium Users

                    </div>

                    <h1 className="
                        text-5xl
                        md:text-7xl
                        font-black
                        leading-tight
                        mb-6
                    ">

                        Unlock Your
                        <span className="
                            text-zinc-400
                        ">
                            {" "}Dream Job
                        </span>

                    </h1>

                    <p className="
                        max-w-3xl
                        mx-auto
                        text-zinc-400
                        text-lg
                        md:text-xl
                        leading-relaxed
                    ">

                        Most candidates fail interviews
                        because they never practice in a
                        real environment.

                        <br />
                        MikiMock Premium gives you
                        unlimited AI mock interviews,
                        performance analysis, and direct
                        hiring opportunities.

                    </p>

                </div>

                {/* WHY PREMIUM */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-6
                    mb-20
                ">

                    <div className="
                        bg-white/5
                        border
                        border-white/10
                        rounded-3xl
                        p-8
                        backdrop-blur-xl
                    ">

                        <div className="
                            text-5xl
                            mb-5
                        ">
                            🎯
                        </div>

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-4
                        ">

                            Unlimited Interviews

                        </h2>

                        <p className="
                            text-zinc-400
                            leading-relaxed
                        ">

                            Practice system design,
                            DSA, HR, behavioral and
                            real company interviews
                            anytime.

                        </p>

                    </div>

                    <div className="
                        bg-white/5
                        border
                        border-white/10
                        rounded-3xl
                        p-8
                        backdrop-blur-xl
                    ">

                        <div className="
                            text-5xl
                            mb-5
                        ">
                            📈
                        </div>

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-4
                        ">

                            Faster Growth

                        </h2>

                        <p className="
                            text-zinc-400
                            leading-relaxed
                        ">

                            Improve confidence,
                            communication, and interview
                            accuracy with AI feedback.

                        </p>

                    </div>

                    <div className="
                        bg-white/5
                        border
                        border-white/10
                        rounded-3xl
                        p-8
                        backdrop-blur-xl
                    ">

                        <div className="
                            text-5xl
                            mb-5
                        ">
                            💼
                        </div>

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-4
                        ">

                            Direct Hiring Access

                        </h2>

                        <p className="
                            text-zinc-400
                            leading-relaxed
                        ">

                            Premium users get priority
                            visibility for hiring partners
                            and recruiters.

                        </p>

                    </div>

                </div>

                {/* PRICING */}

                <div className="
                    text-center
                    mb-12
                ">

                    <h2 className="
                        text-4xl
                        md:text-5xl
                        font-black
                        mb-4
                    ">

                        Choose Your Plan

                    </h2>

                    <p className="
                        text-zinc-400
                        text-lg
                    ">

                        Invest once. Improve forever.

                    </p>

                </div>

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-8
                    mb-24
                ">

                    {
                        plans.map((plan) => {

                            const monthlyPrice =
                                Math.floor(
                                    plan.amount
                                    / plan.monthPlan
                                );

                            return (

                                <div
                                    key={plan.id}
                                    className={`
                                        relative
                                        rounded-3xl
                                        p-8
                                        border
                                        backdrop-blur-xl
                                        transition-all
                                        duration-300
                                        hover:scale-[1.02]
                                        hover:border-white/30

                                        ${
                                            plan.highlight
                                                ? `
                                                    bg-white
                                                    text-black
                                                    border-white
                                                    shadow-2xl
                                                    shadow-white/20
                                                `
                                                : `
                                                    bg-white/5
                                                    border-white/10
                                                    text-white
                                                `
                                        }
                                    `}
                                >

                                    {
                                        plan.highlight && (

                                            <div className="
                                                absolute
                                                -top-4
                                                left-1/2
                                                -translate-x-1/2
                                                bg-black
                                                text-white
                                                px-5
                                                py-2
                                                rounded-full
                                                text-sm
                                                font-bold
                                            ">

                                                MOST POPULAR

                                            </div>
                                        )
                                    }

                                    <div className="
                                        mb-6
                                    ">

                                        <div className={`
                                            inline-block
                                            px-4
                                            py-2
                                            rounded-full
                                            text-sm
                                            font-bold
                                            mb-5

                                            ${
                                                plan.highlight
                                                    ? `
                                                        bg-black
                                                        text-white
                                                    `
                                                    : `
                                                        bg-white/10
                                                        text-white
                                                    `
                                            }
                                        `}>

                                            {plan.tag}

                                        </div>

                                        <h3 className="
                                            text-5xl
                                            font-black
                                            mb-3
                                        ">

                                            ₹ {plan.amount}

                                        </h3>

                                        <p className={`
                                            text-lg

                                            ${
                                                plan.highlight
                                                    ? `
                                                        text-zinc-700
                                                    `
                                                    : `
                                                        text-zinc-400
                                                    `
                                            }
                                        `}>

                                            {plan.monthPlan}
                                            {" "}
                                            Months

                                        </p>

                                        <p className={`
                                            mt-3
                                            text-sm

                                            ${
                                                plan.highlight
                                                    ? `
                                                        text-zinc-700
                                                    `
                                                    : `
                                                        text-zinc-400
                                                    `
                                            }
                                        `}>

                                            Approx ₹
                                            {monthlyPrice}
                                            / month

                                        </p>

                                    </div>

                                    <div className="
                                        space-y-4
                                        mb-10
                                    ">

                                        <div>
                                            ✅ Unlimited Mock
                                            Interviews
                                        </div>

                                        <div>
                                            ✅ AI Performance
                                            Feedback
                                        </div>

                                        <div>
                                            ✅ Resume Visibility
                                        </div>

                                        <div>
                                            ✅ Priority Support
                                        </div>

                                        <div>
                                            ✅ Hiring Access
                                        </div>

                                    </div>

                                    <button
                                        onClick={() =>
                                            handlePayment(
                                                plan.amount,
                                                plan.monthPlan
                                            )
                                        }
                                        disabled={
                                            loadingPlan
                                            === plan.monthPlan
                                        }
                                        className={`
                                            w-full
                                            py-4
                                            rounded-2xl
                                            font-bold
                                            text-lg
                                            transition-all
                                            duration-300

                                            ${
                                                plan.highlight
                                                    ? `
                                                        bg-black
                                                        text-white
                                                        hover:bg-zinc-800
                                                    `
                                                    : `
                                                        bg-white
                                                        text-black
                                                        hover:bg-zinc-200
                                                    `
                                            }
                                        `}
                                    >

                                        {
                                            loadingPlan
                                            === plan.monthPlan
                                                ? "Processing..."
                                                : "Get Premium"
                                        }

                                    </button>

                                </div>
                            );
                        })
                    }

                </div>

                {/* PSYCHOLOGY SECTION */}

                <div className="
                    max-w-5xl
                    mx-auto
                    text-center
                    pb-24
                ">

                    <h2 className="
                        text-4xl
                        md:text-5xl
                        font-black
                        mb-8
                    ">

                        Your Competition
                        Is Practicing Daily.

                    </h2>

                    <p className="
                        text-zinc-400
                        text-xl
                        leading-relaxed
                    ">

                        Every day you delay,
                        someone else becomes better
                        prepared for the same job.

                        <br />
                        The difference between rejection
                        and selection is often just
                        preparation.

                    </p>

                    <div className="
                        mt-10
                        inline-flex
                        items-center
                        gap-3
                        bg-white
                        text-black
                        px-8
                        py-4
                        rounded-2xl
                        font-bold
                        text-lg
                    ">

                        🚀 Start Your Premium Journey

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PremiumPage;