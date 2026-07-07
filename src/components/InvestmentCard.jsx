function InvestmentCard({
    title,
    type,
    risk,
    returns
}) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold">

                {title}

            </h2>

            <p className="mt-2">

                Type : {type}

            </p>

            <p>

                Risk : {risk}

            </p>

            <p>

                Expected Return : {returns}

            </p>

        </div>

    );

}

export default InvestmentCard;

