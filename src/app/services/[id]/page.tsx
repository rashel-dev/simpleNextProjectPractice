import React from "react";

const ServiceDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <div>service details page of {id}</div>;
};

export default ServiceDetails;
