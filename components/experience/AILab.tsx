import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Fragment, useState } from 'react';

import { Chip, ExperienceSection } from './ExperienceSection';
import { Terminal } from '../ui/Terminal';
import { Reveal } from '../ui/Reveal';
import {
  aiPipeline,
  aiQuestionIds,
  sectionAnchor,
  sectionIndex,
  type AiQuestionId,
} from '../../lib/experience/content';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * AI LAB.
 *
 * Two halves: the automation pipeline (agent → MCP → n8n → internal system →
 * automation) and "ASK HΛESSLER".
 *
 * The widget is deliberately deterministic: the answer for a question is a
 * static string in the dictionary, resolved from the same structured facts the
 * rest of the page renders. There is no model call and no generated text, so a
 * recruiter can never read an answer Haessler did not write.
 */
export const AILab = () => {
  const t = useExperienceTranslation();
  const [activeQuestionId, setActiveQuestionId] = useState<AiQuestionId>(
    aiQuestionIds[0]
  );

  const labels = t.sections.aiLab.labels;
  const answer = t.sections.aiLab.questions[activeQuestionId].answer;

  return (
    <ExperienceSection
      id={sectionAnchor('aiLab')}
      index={sectionIndex('aiLab')}
      title={t.nav.aiLab}
      lead={t.sections.aiLab.lead}
    >
      <Reveal>
        <Flex
          alignItems="center"
          gap={{ base: 2, md: 3 }}
          flexWrap="wrap"
          bg="osSurface"
          borderWidth="1px"
          borderColor="osBorder"
          borderRadius="md"
          p={5}
        >
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="osTextMuted"
            mr={2}
          >
            {labels.pipeline}
          </Text>

          {aiPipeline.map((stage, index) => (
            <Fragment key={stage.id}>
              <Chip>{stage.name}</Chip>
              {index < aiPipeline.length - 1 && (
                <Text aria-hidden="true" fontFamily="mono" color="osTextMuted">
                  →
                </Text>
              )}
            </Fragment>
          ))}
        </Flex>
      </Reveal>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: 6, lg: 10 }}
        mt={{ base: 8, md: 10 }}
      >
        <Box w={{ lg: '300px' }} flexShrink={0}>
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color="osAccent"
          >
            {t.sections.aiLab.askLabel}
          </Text>

          <Flex direction="column" gap={2} mt={4}>
            {aiQuestionIds.map((questionId) => {
              const isActive = questionId === activeQuestionId;

              return (
                <Button
                  key={questionId}
                  variant="ghost"
                  height="auto"
                  py={2}
                  px={3}
                  display="block"
                  textAlign="left"
                  whiteSpace="normal"
                  bg={isActive ? 'osElevated' : 'transparent'}
                  borderLeftWidth="2px"
                  borderColor={isActive ? 'osAccent' : 'transparent'}
                  _hover={{ bg: 'osElevated' }}
                  _focusVisible={{
                    boxShadow: '0 0 0 3px rgba(0, 229, 255, 0.45)',
                    outline: 'none',
                  }}
                  onClick={() => setActiveQuestionId(questionId)}
                  aria-pressed={isActive}
                >
                  <Text
                    fontFamily="mono"
                    fontSize="sm"
                    lineHeight="1.5"
                    color={isActive ? 'osText' : 'osTextSecondary'}
                  >
                    {t.sections.aiLab.questions[questionId].question}
                  </Text>
                </Button>
              );
            })}
          </Flex>
        </Box>

        <Box flex="1 1 0" minW={0}>
          <Terminal title={t.sections.aiLab.askLabel} meta={labels.answer}>
            <Text fontSize="sm" lineHeight="1.8" color="osText">
              {answer}
            </Text>
          </Terminal>

          <Text mt={3} fontFamily="mono" fontSize="xs" color="osTextMuted">
            {t.sections.aiLab.askHint}
          </Text>
        </Box>
      </Flex>
    </ExperienceSection>
  );
};
