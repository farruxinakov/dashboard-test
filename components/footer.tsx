import Link from "next/link";

import Container from "@/components/custom-ui/container";
import { Paragraph } from "@/components/custom-ui/paragraph";

const Footer = () => {
  return (
    <footer className="border-t py-8">
      <Container>
        <div className="flex items-center">
          <Paragraph variant="muted">
            Built by{" "}
            <Link
              href="/"
              target="_blank"
              className="font-medium underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Username
            </Link>
            . The source code is available on{" "}
            <Link
              href="/"
              target="_blank"
              className="font-medium underline underline-offset-4 transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
            .
          </Paragraph>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
