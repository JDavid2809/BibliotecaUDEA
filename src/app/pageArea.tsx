import Link from "next/link";
import React from "react";
import Seccion1 from "./Home/SectionArea";
import Seccion3 from "./Home/SectionLocation";
import Seccion2 from "./Home/SectionWelcome";

export default function PageArea() {
  return (
    <div>
      <Seccion1/>
      <Seccion2/>
      <Seccion3/>
    </div>
  );
}
