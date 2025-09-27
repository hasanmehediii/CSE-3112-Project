<<<<<<< Updated upstream
=======
import React from "react";
import styled from "styled-components";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 4rem 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const SectionText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const QuickLinkItem = styled.li`
  margin-bottom: 0.5rem;
`;

const QuickLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #16a34a;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  margin-right: 1rem;

  &:hover {
    color: #16a34a;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 1rem;
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 5px 0 0 5px;
`;

const NewsletterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: #16a34a;
  color: white;
  border-radius: 0 5px 5px 0;
  cursor: pointer;

  &:hover {
    background: #15803d;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #444;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>About Us</SectionTitle>
          <SectionText>
            Khaikhai is your trusted food companion – helping you track meals,
            manage nutrition, and make smarter food choices every day.
          </SectionText>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Quick Links</SectionTitle>
          <QuickLinks>
            <QuickLinkItem>
              <QuickLink href="/about">About Us</QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink href="/contact">Contact</QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink href="/faq">FAQ</QuickLink>
            </QuickLinkItem>
          </QuickLinks>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Contact Us</SectionTitle>
          <SectionText>
            Email: support@khaikhai.com
            <br />
            Phone: (123) 456-7890
          </SectionText>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Follow Us</SectionTitle>
          <SocialLinks>
            <SocialLink href="https://facebook.com">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="https://twitter.com">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://linkedin.com">
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
          <SectionTitle style={{ marginTop: "2rem" }}>Newsletter</SectionTitle>
          <NewsletterForm>
            <NewsletterInput type="email" placeholder="Your email" />
            <NewsletterButton>Subscribe</NewsletterButton>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; 2025 Khaikhai. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
>>>>>>> Stashed changes
